import Container from "typedi";
import { ServicesService } from "../../services/ServicesService";
import { Request, Response, NextFunction } from "express";

export class ServicesController {
  private serviceService: ServicesService = Container.get(ServicesService);

  async getServices(req: Request, res: Response, next: NextFunction): Promise<void> {
    const services = await this.serviceService.getServices();

    res.status(200).json({ services });
  }

  async getServiceById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;

    const service = await this.serviceService.getServiceById(Number(id));

    res.status(200).json({ service });
  }

  async addService(req: Request, res: Response, next: NextFunction): Promise<void> {
    const newService = req.body;

    const service = await this.serviceService.addService(newService);

    res.status(201).json({ service });
  }

  async updateService(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    const updatedService = req.body;

    const service = await this.serviceService.updateService(Number(id), updatedService);

    res.status(200).json({ service });
  }

  async deleteService(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;

    const service = await this.serviceService.deleteService(Number(id));

    res.status(200).json({ service });
  }
}
