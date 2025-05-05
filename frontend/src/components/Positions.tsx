import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getAllPositions } from '../services/positionService';

interface Position {
    id: number;
    title: string;
    manager: string;
    deadline: string;
    status: string;
}

const Positions: React.FC = () => {
    const navigate = useNavigate();
    const [positions, setPositions] = useState<Position[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPositions = async () => {
            try {
                setLoading(true);
                const data = await getAllPositions();
                setPositions(data);
                setLoading(false);
            } catch (err) {
                setError('Error al cargar las posiciones');
                setLoading(false);
                console.error(err);
            }
        };

        fetchPositions();
    }, []);

    const handleViewProcess = (positionId: number) => {
        console.log(`Navegando a posición: ${positionId}`);
        navigate(`/position/${positionId}`);
    };

    // Función para determinar el color del badge según el estado
    const getStatusColor = (status: string): string => {
        switch(status) {
            case 'Abierto':
                return 'bg-warning';
            case 'Contratado':
                return 'bg-success';
            case 'Borrador':
                return 'bg-secondary';
            case 'Cerrado':
                return 'bg-danger';
            default:
                return 'bg-info';
        }
    };

    if (loading) return <div className="text-center mt-5">Cargando...</div>;
    if (error) return <div className="text-center mt-5 text-danger">{error}</div>;

    return (
        <Container className="mt-5">
            <h2 className="text-center mb-4">Posiciones</h2>
            <Row className="mb-4">
                <Col md={3}>
                    <Form.Control type="text" placeholder="Buscar por título" />
                </Col>
                <Col md={3}>
                    <Form.Control type="date" placeholder="Buscar por fecha" />
                </Col>
                <Col md={3}>
                    <Form.Control as="select">
                        <option value="">Estado</option>
                        <option value="open">Abierto</option>
                        <option value="filled">Contratado</option>
                        <option value="closed">Cerrado</option>
                        <option value="draft">Borrador</option>
                    </Form.Control>
                </Col>
                <Col md={3}>
                    <Form.Control as="select">
                        <option value="">Manager</option>
                        <option value="john_doe">John Doe</option>
                        <option value="jane_smith">Jane Smith</option>
                        <option value="alex_jones">Alex Jones</option>
                    </Form.Control>
                </Col>
            </Row>
            <Row>
                {positions.map((position) => (
                    <Col md={4} key={position.id} className="mb-4">
                        <Card className="shadow-sm">
                            <Card.Body>
                                <Card.Title>{position.title}</Card.Title>
                                <Card.Text>
                                    <strong>Manager:</strong> {position.manager}<br />
                                    <strong>Deadline:</strong> {position.deadline}
                                </Card.Text>
                                <span className={`badge ${getStatusColor(position.status)} text-white`}>
                                    {position.status}
                                </span>
                                <div className="d-flex justify-content-between mt-3">
                                    <Button 
                                        variant="primary"
                                        onClick={() => handleViewProcess(position.id)}
                                    >
                                        Ver proceso
                                    </Button>
                                    <Button variant="secondary">Editar</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Positions;