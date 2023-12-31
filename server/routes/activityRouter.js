import { Router } from "express";
import * as activityController from "../controllers/activityController.js";

const activityRouter = Router();

activityRouter
  .route("/frontpage")
  .get(activityController.getRandomActivitiesFrontpage);
activityRouter.route("/:id/bookings").get(activityController.getActivityByIDCheckBookings);
activityRouter.route("/:id").get(activityController.getActivityByID);
activityRouter.route("/").get(activityController.getActivities);

export default activityRouter;
