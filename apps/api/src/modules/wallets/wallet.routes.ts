import { Router } from "express";
import { requireAuth } from "../../auth/requireAuth";
import { asyncHandler } from "../../utils/asyncHandler";
import { Transaction } from "../orders/transaction.model";
import PDFDocument from "pdfkit";
import { Order } from "../orders/order.model";

const router = Router();
router.use(requireAuth);

router.get("/balances", asyncHandler(async (req, res) => {
  const txs = await Transaction.find({ $or: [{}, {}] }); // simple demo: sum by type
  let earned = 0, held = 0, spent = 0;
  for (const t of txs) {
    if (t.type === "fund" && t.status === "succeeded") { held += t.amountPi; spent += t.amountPi; }
    if (t.type === "release" && t.status === "succeeded") { earned += t.amountPi; held -= t.amountPi; }
    if (t.type === "refund" && t.status === "succeeded") { held -= t.amountPi; spent -= t.amountPi; }
  }
  res.json({ balance: { earned, held, spent } });
}));

router.get("/invoice/:orderId.pdf", asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.orderId);
  if (!order) return res.status(404).end();
  const doc = new PDFDocument();
  res.setHeader("Content-Type", "application/pdf");
  doc.text("Invoice", { align: "center" });
  doc.moveDown();
  doc.text(`Order: ${order._id}`);
  doc.text(`Total Pi: ${order.totalAmountPi}`);
  doc.text(`Escrow status: ${order.escrowStatus}`);
  doc.end();
  doc.pipe(res);
}));

export default router;
