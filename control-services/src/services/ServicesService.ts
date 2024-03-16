import { PrismaClient } from "@prisma/client";
import { Service } from "typedi";
import { NewServiceType, ServiceType } from "../types/Service";
import { ServiceNotFoundError } from "../errors/ServicesError";
import logger from "../utils/logger";
import { ServerError } from "../errors/ServerError";

@Service()
export class ServicesService {
  private prismaClient = new PrismaClient();

  async getServices(): Promise<ServiceType[]> {
    const services = await this.prismaClient.services.findMany();
    return services;
  }

  async getServiceById(id: number): Promise<ServiceType> {
    const service = await this.prismaClient.services.findUnique({
      where: {
        id,
      },
    });

    if (!service) {
      logger.error(`[ServicesService] Service not found. ServiceId: ${id}`);
      throw new ServiceNotFoundError();
    }

    return service;
  }

  async addService(service: NewServiceType): Promise<ServiceType> {
    const newService = await this.prismaClient.services.create({
      data: service,
    });

    if (!newService) {
      logger.error(`[ServicesService] Service not created. Service: ${service}`);
      throw new ServerError();
    }

    return newService;
  }

  async updateService(id: number, service: NewServiceType): Promise<ServiceType> {
    const updatedService = await this.prismaClient.services.update({
      where: {
        id,
      },
      data: { ...service, updatedAt: new Date() },
    });

    if (!updatedService) {
      logger.error(`[ServicesService] Service not updated. ServiceId: ${id}`);
      throw new ServerError();
    }

    return updatedService;
  }

  async deleteService(id: number): Promise<ServiceType> {
    const deletedService = await this.prismaClient.services.delete({
      where: {
        id,
      },
    });

    if (!deletedService) {
      logger.error(`[ServicesService] Service not deleted. ServiceId: ${id}`);
      throw new ServerError();
    }

    return deletedService;
  }
}
