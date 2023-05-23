const express = require("express");
const router = express.Router();
const requestsController = require("../Controller/requestsController");

router.route("/createRefundRequest").post(requestsController.createRefundRequest);
router.route("/createReport").post(requestsController.createReport);
router.route("/createRequestAccess").post(requestsController.createRequestAccess);

router.route("/deleteRefundRequest/:id").delete(requestsController.deleteRefundRequest);
router.route("/deleteReport/:id").delete(requestsController.deleteReport);
router.route("/deleteRequestAccess/:id").delete(requestsController.deleteRequestAccess);

router.route("/getRefundRequest/:id").get(requestsController.getRefundRequest);
router.route("/getReport/:id").get(requestsController.getReport);
router.route("/getRequestAccess/:id").get(requestsController.getRequestAccess);

router.route("/myReports/:clientId").get(requestsController.getClientReport);

router.route("/getAllRefundRequest").get(requestsController.getAllRefundRequest);
router.route("/getAllReport").get(requestsController.getAllReport);
router.route("/getAllRequestAccess").get(requestsController.getAllRequestAccess);

router.route("/changeRefundStatus/:id").put(requestsController.changeRefundStatus);
router.route("/changeReportStatus/:id").put(requestsController.changeReportStatus);
router.route("/changeAccessRequestStatus/:id").put(requestsController.changeAccessRequestStatus);

module.exports = router;
