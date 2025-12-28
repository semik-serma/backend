import Visit from '../models/visitModel.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const trackVisit = async (req, res) => {
    try {
        const ip = req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for'];
        const userAgent = req.headers['user-agent'] || 'Unknown';
        const page = req.body.page || req.query.page || '/';

        await Visit.create({
            ip,
            userAgent,
            page
        });

        successResponse(res, 'Visit tracked successfully');
    } catch (error) {
        errorResponse(res, 'Error tracking visit', 500, error.message);
    }
};

export const getVisits = async (req, res) => {
    try {
        const visits = await Visit.find().sort({ timestamp: -1 });
        successResponse(res, 'Visits retrieved successfully', visits);
    } catch (error) {
        errorResponse(res, 'Error retrieving visits', 500, error.message);
    }
};

export const getVisitStats = async (req, res) => {
    try {
        const totalVisits = await Visit.countDocuments();
        const uniqueVisits = await Visit.distinct('ip').then(ips => ips.length);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayVisits = await Visit.countDocuments({ timestamp: { $gte: today } });

        const stats = {
            totalVisits,
            uniqueVisits,
            todayVisits
        };

        successResponse(res, 'Visit statistics retrieved successfully', stats);
    } catch (error) {
        errorResponse(res, 'Error retrieving visit statistics', 500, error.message);
    }
};
