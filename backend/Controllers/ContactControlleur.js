const Contact = require("../Models/Contact");

// Add a new contact
exports.addContact = async (req, res) => {
  try {
    const { FirstName, LastName, CIN, PhoneNumber } = req.body;
    const newContact = new Contact({ FirstName, LastName, CIN, PhoneNumber });

    const savedContact = await newContact.save();
    res.status(200).json(savedContact);
  } catch (error) {
    console.error("Error adding contact:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Modify an existing contact
exports.modifyContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { FirstName, LastName, CIN, PhoneNumber } = req.body;

    const modifiedContact = await Contact.findByIdAndUpdate(
      id,
      { FirstName, LastName, CIN, PhoneNumber },
      { new: true }
    );
    if (!modifiedContact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.status(200).json(modifiedContact);
  } catch (error) {
    console.error("Error modifying contact:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all contacts
exports.showContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error getting contacts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a contact
exports.deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedContact = await Contact.findByIdAndDelete(id);

    if (!deletedContact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.status(200).json(deletedContact);
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
