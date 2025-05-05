import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import { ArrowLeft } from 'react-bootstrap-icons';
import { useParams, useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable, DroppableProvided, DraggableProvided, DropResult } from '@hello-pangea/dnd';
import { getInterviewFlow, getCandidatesByPosition, updateCandidateStage } from '../services/positionService';

interface InterviewStep {
  id: number;
  name: string;
  interviewFlowId?: number;
  interviewTypeId?: number;
  orderIndex?: number;
}

interface Candidate {
  id: number;
  name: string;
  current_interview_step: number;
  score: number;
  applicationId?: number;
}

const PositionKanban: React.FC = () => {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const navigate = useNavigate();
  const [positionName, setPositionName] = useState<string>('');
  const [interviewSteps, setInterviewSteps] = useState<InterviewStep[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Parámetros de ruta:", params);
    console.log("ID de posición:", id);

    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Obtener información del flujo de entrevista
        const flowData = await getInterviewFlow(id);
        setPositionName(flowData.positionName);
        setInterviewSteps(flowData.interviewSteps);
        console.log("Datos de flujo de entrevista:", flowData);

        // Obtener candidatos
        const candidatesData = await getCandidatesByPosition(id);
        setCandidates(candidatesData);
        console.log("Datos de candidatos:", candidatesData);
        
        setLoading(false);
      } catch (err) {
        console.error("Error al cargar los datos:", err);
        setError('Error al cargar los datos: ' + (err instanceof Error ? err.message : 'Error desconocido'));
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    } else {
      setError('No se proporcionó un ID de posición válido');
    }
  }, [id, params]);

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    console.log("Drag end:", { destination, source, draggableId });

    // Si no hay destino o el destino es el mismo que el origen, no hacer nada
    if (!destination || 
        (destination.droppableId === source.droppableId)) {
      return;
    }

    // Obtener el ID del candidato y el nuevo step
    const candidateId = parseInt(draggableId);
    const newStepId = parseInt(destination.droppableId);

    try {
      // Actualizar localmente primero para UI inmediata
      setCandidates(prevCandidates => 
        prevCandidates.map(candidate => 
          candidate.id === candidateId 
            ? { ...candidate, current_interview_step: newStepId } 
            : candidate
        )
      );

      // Enviar actualización al servidor (simulado)
      const result = await updateCandidateStage(candidateId, newStepId);
      console.log("Resultado de la actualización:", result);
    } catch (err) {
      console.error('Error al actualizar la etapa del candidato:', err);
      // Revertir cambios en caso de error
      setError('Error al actualizar la etapa del candidato');
    }
  };

  // Renderiza los candidatos agrupados por etapa de entrevista
  const renderCandidatesByStep = (stepId: number) => {
    const stepCandidates = candidates.filter(
      candidate => candidate.current_interview_step === stepId
    );

    console.log(`Candidatos para etapa ${stepId}:`, stepCandidates);

    return (
      <Droppable droppableId={stepId.toString()} key={stepId}>
        {(provided: DroppableProvided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="kanban-column"
            style={{ minHeight: '300px' }}
          >
            {stepCandidates.map((candidate, index) => (
              <Draggable
                key={candidate.id}
                draggableId={candidate.id.toString()}
                index={index}
              >
                {(provided: DraggableProvided) => (
                  <Card
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="mb-2 candidate-card"
                  >
                    <Card.Body>
                      <Card.Title>{candidate.name}</Card.Title>
                      <Badge bg={getScoreColor(candidate.score)}>
                        {candidate.score.toFixed(1)}
                      </Badge>
                    </Card.Body>
                  </Card>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  };

  // Función para determinar el color del badge según la puntuación
  const getScoreColor = (score: number): string => {
    if (score >= 4) return 'success';
    if (score >= 3) return 'info';
    if (score >= 2) return 'warning';
    return 'danger';
  };

  if (loading) return <div className="text-center mt-5">Cargando...</div>;
  if (error) return <div className="text-center mt-5 text-danger">{error}</div>;

  return (
    <Container fluid className="mt-4">
      <Row className="mb-4">
        <Col>
          <Button 
            variant="outline-primary" 
            className="mb-3 d-flex align-items-center shadow-sm"
            style={{
              borderRadius: '25px',
              padding: '8px 16px',
              transition: 'all 0.2s ease'
            }}
            onClick={() => navigate('/positions')}
          >
            <ArrowLeft size={18} className="me-2" />
            <span>Volver a posiciones</span>
          </Button>
          <h2 className="mb-3">{positionName}</h2>
        </Col>
      </Row>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="d-flex flex-wrap kanban-board">
          {interviewSteps.map((step) => (
            <div 
              key={step.id} 
              className="kanban-column-container"
              style={{ 
                flex: '1 0 300px',
                maxWidth: '100%',
                padding: '0 10px',
                marginBottom: '20px'
              }}
            >
              <h5 className="text-center p-2 bg-light rounded">{step.name}</h5>
              {renderCandidatesByStep(step.id)}
            </div>
          ))}
        </div>
      </DragDropContext>
    </Container>
  );
};

export default PositionKanban; 