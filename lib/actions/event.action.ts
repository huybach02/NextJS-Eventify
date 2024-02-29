"use server";

import {
  CreateEventParams,
  DeleteEventParams,
  GetAllEventsParams,
  UpdateEventParams,
} from "@/types";
import {handleError} from "../utils";
import {connectToDatabase} from "../database";
import User from "../database/models/user.model";
import Event from "../database/models/event.model";
import {revalidatePath} from "next/cache";

export const createEvent = async ({event, userId, path}: CreateEventParams) => {
  try {
    await connectToDatabase();

    const organizer = await User.findById(userId);

    if (!organizer) {
      throw new Error("Organizer not found");
    }

    const newEvent = await Event.create({
      ...event,
      category: event.categoryId,
      organizer: userId,
    });

    return JSON.parse(JSON.stringify(newEvent));
  } catch (error) {
    handleError(error);
  }
};

export const getEventById = async (eventId: string) => {
  try {
    await connectToDatabase();

    const event = await Event.findById(eventId)
      .populate("organizer", "_id firstName lastName")
      .populate("category", "_id name");

    if (!event) {
      throw new Error("Event not found");
    }

    return JSON.parse(JSON.stringify(event));
  } catch (error) {
    handleError(error);
  }
};

export const getAllEvents = async ({
  query,
  limit = 6,
  page,
  category,
}: GetAllEventsParams) => {
  try {
    await connectToDatabase();

    const conditions = {};

    const events = await Event.find(conditions)
      .sort({createdAt: -1})
      .skip(0)
      .limit(limit)
      .populate("organizer", "_id firstName lastName")
      .populate("category", "_id name");

    const eventCount = await Event.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(eventCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
};

export const deleteEventById = async ({eventId, path}: DeleteEventParams) => {
  try {
    await connectToDatabase();

    const event = await Event.findByIdAndDelete(eventId);

    if (!event) {
      throw new Error("Event not found");
    }

    revalidatePath(path);

    return JSON.parse(JSON.stringify(event));
  } catch (error) {
    handleError(error);
  }
};

export async function updateEvent({userId, event, path}: UpdateEventParams) {
  try {
    await connectToDatabase();

    const eventToUpdate = await Event.findById(event._id);
    if (!eventToUpdate || eventToUpdate.organizer.toHexString() !== userId) {
      throw new Error("Unauthorized or event not found");
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      event._id,
      {...event, category: event.categoryId},
      {new: true}
    );
    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedEvent));
  } catch (error) {
    handleError(error);
  }
}
