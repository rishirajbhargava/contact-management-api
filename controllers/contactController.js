const asyncHandler= require("express-async-handler");
const Contact = require('../models/ContactModel');

//@Desc Get all routes
//route GET /api/contacts
//@access public

const getContacts= asyncHandler (async(req,res)=>{
    const contacts = await Contact.find({user_id:req.user.id});
    res.status(200).json(contacts);
});

//@Desc Create new contact
//route Post /api/contacts
//@access private


const createContact=asyncHandler( async(req,res)=>{
    const {name, email,phone} = req.body;

    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All feilds are mandotory! ");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id:req.user.id,
    })
    res.status(201).json(contact);
});
//@Desc get individual contact
//route GET /api/contacts/id
//@access private

const getContact=asyncHandler( async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});
//@Desc update a contact
//route PUT /api/contacts/id
//@access private

//   UPDATE CONTACT API IS NOT WORKING

                            const updateContact=asyncHandler( async (req,res)=>{
                                const contact = await Contact.findById(req.params.id);
                                if(!contact){
                                    res.status(404);
                                    throw new Error("Contact not found");
                                }
                               if(contact.user_id.toString()!==req.user.id){
                                res.status(403);
                                throw new Error("User don't have permission to manage other user's contact");
                               }
                                const updatedContact= await Contact.findByIdAndUpdate(req.body.id,
                                req.body,{new:true});

                            

                                res.status(200).json(updatedContact);
                            })


//@Desc delete a contact
//route Post /api/contacts/id
//@access private

const deleteContact=asyncHandler( async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.user_id.toString()!==req.user.id){
        res.status(403);
        throw new Error("User don't have permission to manage other user's contact");
       }

    await Contact.deleteOne({_id:req.params.id});

    res.status(200).json(contact);
})











module.exports={getContacts, createContact,getContact,updateContact,deleteContact}

