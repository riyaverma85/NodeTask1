const mongoose = require("mongoose");
require("dotenv").config();

const repair = async () => {
  try {
    console.log("Connecting to Database:", process.env.MONGO_URL);
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ Database Connected Successfully!");

    // We use the 'admin' collection directly for the fix
    const adminCollection = mongoose.connection.collection("admin");

    const adminEmail = "riya1234@gmail.com";
    const adminPass = "r1234";

    console.log("Checking for admin record in 'admin' collection...");
    const existing = await adminCollection.findOne({ 
        $or: [ { email: adminEmail }, { Email: adminEmail } ] 
    });

    if (existing) {
        console.log("Found existing admin. Ensuring password is correct...");
        await adminCollection.updateOne(
            { _id: existing._id },
            { $set: { email: adminEmail, password: adminPass } }
        );
        console.log("✅ Admin record UPDATED successfully in collection 'admin'.");
    } else {
        console.log("No admin found. Creating a NEW one...");
        await adminCollection.insertOne({
            email: adminEmail,
            password: adminPass
        });
        console.log("✅ Admin record CREATED successfully in collection 'admin'.");
    }

    // Also check standard plural 'admins' just in case
    const adminsCollection = mongoose.connection.collection("admins");
    const existingPlural = await adminsCollection.findOne({ email: adminEmail });
    if (!existingPlural) {
        console.log("Mirroring record to 'admins' collection for redundancy...");
        await adminsCollection.insertOne({ email: adminEmail, password: adminPass });
    }

    console.log("🎉 DATABASE REPAIR COMPLETE! Please try logging in now.");
    process.exit(0);
  } catch (error) {
    console.error("❌ REPAIR FAILED:", error.message);
    process.exit(1);
  }
};

repair();
