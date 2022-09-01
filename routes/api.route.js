const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.get("/products", async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      include: { Category: true },
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.post("/products", async (req, res, next) => {
  try {
    const data = req.body;
    const product = await prisma.product.create({
      data: req.body,
    });
    res.json(product);
  } catch (error) {
    next(error);
  }
});
router.get("/products/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: {
        id: Number(id),
      },
      include:{Category:true}
    });
    res.json(product);
  } catch (error) {
    next(error);
  }
});
router.delete("/products/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedproduct = await prisma.product.delete({
      where: {
        id: Number(id),
      }
    });
    res.json(deletedproduct);
  } catch (error) {
    next(error);
  }
});
router.patch("/products/:id", async (req, res, next) => {
  try{
    const{id}=req.params;
    const product = await prisma.product.update({
      where:{
        id: Number(id)
      },
      data:req.body,
      include:{
        Category:true
      }
    })
    res.json(product);
    console.log(product.quantity)
  }catch(error){
    next(error);
  }
});

module.exports = router;
