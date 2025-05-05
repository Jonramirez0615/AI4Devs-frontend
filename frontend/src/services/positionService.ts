import axios from 'axios';

const API_URL = 'http://localhost:3010';

interface InterviewFlow {
  positionName: string;
  interviewSteps: {
    id: number;
    name: string;
  }[];
}

interface Candidate {
  id: number;
  name: string;
  current_interview_step: number;
  score: number;
}

interface Position {
  id: number;
  title: string;
  manager: string;
  deadline: string;
  status: string;
}

// Datos simulados para desarrollo sin backend
const mockInterviewFlows: Record<string, InterviewFlow> = {
  '1': {
    positionName: 'Senior Backend Engineer',
    interviewSteps: [
      { id: 1, name: 'CV Review' },
      { id: 2, name: 'Phone Interview' },
      { id: 3, name: 'Technical Test' },
      { id: 4, name: 'Final Interview' },
      { id: 5, name: 'Offer' }
    ]
  },
  '2': {
    positionName: 'Junior Android Engineer',
    interviewSteps: [
      { id: 1, name: 'CV Review' },
      { id: 2, name: 'Phone Screen' },
      { id: 3, name: 'Coding Test' },
      { id: 4, name: 'Team Interview' },
      { id: 5, name: 'Offer' }
    ]
  },
  '3': {
    positionName: 'Product Manager',
    interviewSteps: [
      { id: 1, name: 'CV Review' },
      { id: 2, name: 'Screening Call' },
      { id: 3, name: 'Case Study' },
      { id: 4, name: 'Team Panel' },
      { id: 5, name: 'Executive Interview' },
      { id: 6, name: 'Offer' }
    ]
  }
};

const mockCandidates: Record<string, Candidate[]> = {
  '1': [
    { id: 1, name: 'Juan Pérez', current_interview_step: 1, score: 4.5 },
    { id: 2, name: 'María García', current_interview_step: 2, score: 3.8 },
    { id: 3, name: 'Carlos López', current_interview_step: 3, score: 4.2 },
    { id: 4, name: 'Ana Martínez', current_interview_step: 4, score: 4.7 },
    { id: 5, name: 'Roberto Sánchez', current_interview_step: 5, score: 4.9 },
    { id: 6, name: 'Laura Rodríguez', current_interview_step: 1, score: 3.5 },
    { id: 7, name: 'Miguel Fernández', current_interview_step: 2, score: 2.9 },
    { id: 8, name: 'Sofía González', current_interview_step: 3, score: 3.1 }
  ],
  '2': [
    { id: 9, name: 'Pedro Díaz', current_interview_step: 1, score: 3.7 },
    { id: 10, name: 'Carmen Ruiz', current_interview_step: 2, score: 4.1 },
    { id: 11, name: 'Javier Moreno', current_interview_step: 3, score: 3.9 },
    { id: 12, name: 'Isabel Torres', current_interview_step: 4, score: 4.3 }
  ],
  '3': [
    { id: 13, name: 'Elena Vega', current_interview_step: 1, score: 4.6 },
    { id: 14, name: 'Diego Castro', current_interview_step: 2, score: 3.9 },
    { id: 15, name: 'Patricia Molina', current_interview_step: 3, score: 4.1 },
    { id: 16, name: 'Gabriel Herrera', current_interview_step: 4, score: 3.7 },
    { id: 17, name: 'Lucía Ortega', current_interview_step: 5, score: 4.8 }
  ]
};

// Obtener el flujo de entrevista para una posición específica
export const getInterviewFlow = async (positionId: string | undefined): Promise<InterviewFlow> => {
  try {
    // Intentar primero con datos simulados
    if (positionId && mockInterviewFlows[positionId]) {
      console.log('Usando datos simulados para el flujo de entrevista');
      return Promise.resolve(mockInterviewFlows[positionId]);
    }
    
    // Si no hay datos simulados o se requiere backend, intentar con la API
    const response = await axios.get(`${API_URL}/positions/${positionId}/interviewflow`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el flujo de entrevista:', error);
    
    // Si hay un error y tenemos datos simulados, usarlos como fallback
    if (positionId && mockInterviewFlows[positionId]) {
      console.log('Fallback a datos simulados para el flujo de entrevista');
      return mockInterviewFlows[positionId];
    }
    
    // Si no hay datos simulados para este ID, crear un flujo genérico
    return {
      positionName: 'Posición desconocida',
      interviewSteps: [
        { id: 1, name: 'CV Review' },
        { id: 2, name: 'Phone Interview' },
        { id: 3, name: 'Technical Test' },
        { id: 4, name: 'Final Interview' },
        { id: 5, name: 'Offer' }
      ]
    };
  }
};

// Obtener los candidatos para una posición específica
export const getCandidatesByPosition = async (positionId: string | undefined): Promise<Candidate[]> => {
  try {
    // Intentar primero con datos simulados
    if (positionId && mockCandidates[positionId]) {
      console.log('Usando datos simulados para candidatos');
      return Promise.resolve(mockCandidates[positionId]);
    }
    
    // Si no hay datos simulados o se requiere backend, intentar con la API
    const response = await axios.get(`${API_URL}/positions/${positionId}/candidates`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los candidatos:', error);
    
    // Si hay un error y tenemos datos simulados, usarlos como fallback
    if (positionId && mockCandidates[positionId]) {
      console.log('Fallback a datos simulados para candidatos');
      return mockCandidates[positionId];
    }
    
    // Si no hay datos simulados para este ID, devolver un array vacío
    return [];
  }
};

// Actualizar la etapa de un candidato
export const updateCandidateStage = async (candidateId: number, newStageId: number): Promise<any> => {
  try {
    // Actualizar datos simulados
    Object.keys(mockCandidates).forEach(positionId => {
      mockCandidates[positionId] = mockCandidates[positionId].map(candidate => 
        candidate.id === candidateId 
          ? { ...candidate, current_interview_step: newStageId } 
          : candidate
      );
    });
    
    console.log('Simulando actualización de etapa para candidato:', candidateId, 'nueva etapa:', newStageId);
    
    // Intentar también con la API
    try {
      const response = await axios.put(`${API_URL}/candidates/${candidateId}/stage`, {
        new_interview_step: newStageId
      });
      return response.data;
    } catch (apiError) {
      // Si la API falla, devuelve un objeto de éxito simulado
      return { success: true, message: "Actualización simulada exitosa" };
    }
  } catch (error) {
    console.error('Error al actualizar la etapa del candidato:', error);
    // No lanzar error para que la UI siga funcionando
    return { success: true, message: "Actualización simulada exitosa (con manejo de error)" };
  }
};

// Obtener todas las posiciones (placeholder - a implementar en el backend)
export const getAllPositions = async (): Promise<Position[]> => {
  try {
    // Esta función usaría un endpoint real en producción
    // Por ahora devolvemos datos de prueba
    return [
      { id: 1, title: 'Senior Backend Engineer', manager: 'John Doe', deadline: '2024-12-31', status: 'Abierto' },
      { id: 2, title: 'Junior Android Engineer', manager: 'Jane Smith', deadline: '2024-11-15', status: 'Contratado' },
      { id: 3, title: 'Product Manager', manager: 'Alex Jones', deadline: '2024-07-31', status: 'Borrador' }
    ];
  } catch (error) {
    console.error('Error al obtener las posiciones:', error);
    throw error;
  }
}; 