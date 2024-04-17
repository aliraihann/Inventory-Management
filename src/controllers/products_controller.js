import { 
    getItemBySku, 
    orderByCheck,
    getItemByName, 
    getItemByCat, 
    getAllItem, 
    checkSpesificItemName, 
    addItem, 
    deleteItem, 
    updateItemQuantity
 } from '../models/products_model.js';

const inventory = async (req, res) => {
    const { sku, product_name, product_category, order_by, arrangement } = req.body;
    try {
        if (order_by && !(await orderByCheck(order_by)).length) {
            throw new Error("Incorrect category for sorting. Please insert the correct category");
        }
        if (arrangement && !["asc","ASC","desc","DESC"].includes(arrangement)) {
            throw new Error("Incorrect arrangement for sorting. Please insert the correct arrangement");
        }
        let inventoryData;
        if (sku) {
            inventoryData = await getItemBySku(sku);
            if (!inventoryData) {
                throw new Error("Incorrect SKU. Please insert the correct SKU");
            }
        } else if (product_category) {
            inventoryData = await getItemByCat(product_category, order_by, arrangement);
        } else if (product_name) {
            inventoryData = await getItemByName(product_name, order_by, arrangement);
        } else {
            inventoryData = await getAllItem(order_by, arrangement);
        }

        if (!inventoryData || inventoryData.length === 0) {
            throw new Error("No items found");
        }
        res.status(200).send(inventoryData);          
    } catch (err) {
        console.log({
            "message": "error on controller",
            "error": `${err.message}`
        });
        res.status(500)
        .json({
            "error": `${err.message}`
        })
    }
}

const insertItem = async (req, res) => {
    const { product_name, product_category, quantity } = req.body;
    const update_by = req.employeeId;
    const update_at = new Date();
    try {
        if (checkSpesificItemName(product_name).length > 0) {
            throw new Error("Item already exist in the Database.")
        }
        const add = await addItem(product_name, product_category, quantity, update_at, update_by);
        res.status(200).json({
            message: "Item successfully added to the Database",
            inserted_item: add
        });
    } catch (err) {
        console.log({
            "message": "error on controller",
            "error": `${err.message}`
        });
        res.status(500)
        .json({
            "error": `${err.message}`
        })
    }
}

const editQuantity = async (req, res) => {
    const { sku, quantity } = req.body;
    const update_by = req.employeeId;
    const update_at = new Date();
    try {
        const inventoryData = await getItemBySku(sku);
        if (typeof inventoryData === "undefined") {
            throw new Error("Incorrect SKU. Please insert the correct code");
        } 
        if (!Number.isInteger(quantity)){
            throw new Error("Incorrect Quantity. Please only insert a number");
        }
        const updateQuantity = await updateItemQuantity(quantity, update_at, update_by, sku);
        res.status(200).json({
            message: "Item successfully updated",
            updated_data: updateQuantity
        });
    } catch (err) {
        console.log({
            "message": "error on controller",
            "error": `${err.message}`
        });
        res.status(500)
        .json({
            "error": `${err.message}`
        })
    }
}

const removeItem = async (req, res) => {
    const { sku } = req.body;
    try {
        const inventoryData = await getItemBySku(sku);
            if (typeof inventoryData === "undefined") {
                throw new Error("Incorrect SKU. Please insert the correct code");
            } 
            const remove = await deleteItem(sku);
            res.status(200).json({
                message: "Item successfully deleted from the Database"
            });
    } catch (err) {
        console.log({
            "message": "error on controller",
            "error": `${err.message}`
        });
        res.status(500)
        .json({
            "error": `${err.message}`
        })
    }
}
export { inventory, insertItem, editQuantity, removeItem }