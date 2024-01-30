import { getItemBySku, orderByCheck,getItemByName, getItemByCat, getAllItem, checkSpesificItemName, addItem, deleteItem, updateItemQuantity } from '../models/products_model.js';

const inventory = async (req, res) => {
    const { sku, product_name, product_category, order_by, arrangement } = req.body;
    try {
        const orderCheck = await orderByCheck(order_by);
        if (typeof orderCheck === "undefined") {
            res.status(404).send("Incorrect category for sorting. Please insert the correct column");
        }
        if (arrangement) {
            if (!(arrangement !== "asc"|| arrangement !== "ASC" || arrangement !== "desc" || arrangement !== "DESC")) {
                res.status(404).send("Incorrect arrangement for sorting. Please insert the correct arrangement");
            }
        }
        if (sku) {
            const inventoryData = await getItemBySku(sku);
            if (typeof inventoryData === "undefined") {
                res.status(404).send("Incorrect SKU. Please insert the correct code");
            } 
            res.status(200).send(inventoryData);
        }
        if (product_category) {
            const inventoryData = await getItemByCat(product_category);
            if (typeof inventoryData === "undefined") {
                res.status(404).send("Incorrect SKU. Please insert the correct category");
            } 
            if (order_by && arrangement) {
                const inventoryData = await getItemByCat(product_category, order_by, arrangement);
                res.status(200).send(inventoryData);
            }
            res.status(200).send(inventoryData);
        }
        if (product_name) {
            const inventoryData =  await getItemByName(product_name);
            if (typeof inventoryData === "undefined" || inventory.length === 0) {
                res.status(404).send("There is no item");
            }
            if (order_by && arrangement) {
                const inventoryData = await getItemByName(product_name, order_by, arrangement);
                res.status(200).send(inventoryData);
            }
            res.status(200).send(inventoryData);
        }
        if (order_by && arrangement) {
            const inventoryData = await getAllItem(order_by, arrangement);
            res.status(200).send(inventoryData);
        }
        const inventoryData = await getAllItem();
        res.status(200).send(inventoryData);          
    } catch (err) {
        console.log(err);
        res.status(500)
        .json({
            "message": "error on controller",
            "error": `${err.message}`
        })
    }
}

const insertItem = async (req, res) => {
    const { product_name, product_category, quantity } = req.body;
    const update_by = req.employeeId;
    const update_at = new Date();
    try {
        if (typeof checkSpesificItemName(product_name) !== "undefined") {
            throw new Error("Item already exist in the Database.")
        }
        const add = await addItem(product_name, product_category, quantity, update_at, update_by);
        res.status(200).json({
            message: "Item successfully added to the Database",
            inserted_item: add
        });
    } catch (err) {
        console.log(err);
        res.status(500)
        .json({
            "message": "error on controller",
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
            res.status(404).send("Incorrect SKU. Please insert the correct code");
        } 
        const updateQuantity = await updateItemQuantity(quantity, update_at, update_by, sku);
        res.status(200).json({
            message: "Item successfully updated",
            updated_data: updateQuantity
        });
    } catch (err) {
        console.log(err);
        res.status(500)
        .json({
            "message": "error on controller",
            "error": `${err.message}`
        })
    }
}

const removeItem = async (req, res) => {
    const { sku } = req.body;
    try {
        const inventoryData = await getItemBySku(sku);
            if (typeof inventoryData === "undefined") {
                res.status(404).send("Incorrect SKU. Please insert the correct code");
            } 
            const remove = await deleteItem(sku);
            res.status(200).json({
                message: "Item successfully deleted from the Database"
            });
    } catch (err) {
        console.log(err);
        res.status(500)
        .json({
            "message": "error on controller",
            "error": `${err.message}`
        })
    }
}
export { inventory, insertItem, editQuantity, removeItem }