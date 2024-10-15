import * as serviceService from "../services/serviceService.js";
import sendResponse from "../utils/sendResponse.js";

// Crear un nuevo servicio
export const createService = async (req, res) => {
  try {
    const newService = await serviceService.createService(req.body);
    sendResponse(res, 201, newService, "Servicio creado exitosamente");
  } catch (error) {
    sendResponse(res, 500, null, error.message);
  }
};

// Obtener todos los servicios
export const getServices = async (req, res) => {
  try {
    const services = await serviceService.getServices();
    sendResponse(res, 200, services, "Servicios obtenidos exitosamente");
  } catch (error) {
    sendResponse(res, 500, null, error.message);
  }
};

// Obtener un servicio por ID
export const getServiceById = async (req, res) => {
  try {
    const service = await serviceService.getServiceById(req.params.id);
    sendResponse(res, 200, service, "Servicio encontrado");
  } catch (error) {
    sendResponse(res, 404, null, error.message);
  }
};

// Actualizar un servicio
export const updateService = async (req, res) => {
  try {
    const updatedService = await serviceService.updateService(req.params.id, req.body);
    sendResponse(res, 200, updatedService, "Servicio actualizado exitosamente");
  } catch (error) {
    sendResponse(res, 404, null, error.message);
  }
};

// Eliminar un servicio
export const deleteService = async (req, res) => {
  try {
    const result = await serviceService.deleteService(req.params.id);
    sendResponse(res, 200, null, result.message);
  } catch (error) {
    sendResponse(res, 404, null, error.message);
  }
};
