const Joi = require('@hapi/joi');
const joi = require('joi');


// Register validation
const registerValidation = (data) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().min(2).required().email(),
      password: Joi.string().min(4).required(),
      image: Joi.optional({
        nullable: true
      }),
      website: Joi.optional({
        nullable: true
      }),
    
      shortBio: Joi.optional({
        nullable: true
      }),
      profession: Joi.optional({
        nullable: true
      }),           
  
      role: Joi.string().required(),
     
      favorite: Joi.optional({
        nullable: true
      }),
      dateOfBirth: Joi.date().required() ,
      gender: Joi.optional({
        nullable: true
      }),
      mobileNo: Joi.number(),
      address: Joi.optional({
        nullable: true
      }),
      city: Joi.optional({
        nullable: true
      }),
      state: Joi.optional({
        nullable: true
      }),
      country: Joi.optional({
        nullable: true
      }),
      zipcode: Joi.optional({
        nullable: true
      }),
      isVerified: Joi.boolean(),
      isActive: Joi.boolean(),
      isDeleted: Joi.boolean(),
      otp: Joi.number(),
      categoryId: Joi.optional({
        nullable: true
      }),
      ownerManagerName: Joi.optional({
        nullable: true
      }),
      ownerManagerMobileNo: Joi.optional({
        nullable: true
      }),
      ownerManagerEmail: Joi.optional({
        nullable: true
      }),
      ownerManagerTitle: Joi.optional({
        nullable: true
      }),
      lat: Joi.optional({
        nullable: true
      }),
      lng: Joi.optional({
        nullable: true
      })
    });
    return schema.validate(data);
  };
//----------------------------------------------

// Login validation
const loginValidation = (data) => {
    const schema = Joi.object({
      email: Joi.string().min(4).required().email(),
      password: Joi.string().min(6).required()
    });
  
    return schema.validate(data);
  };

//---------------------------------------------




  module.exports={
    registerValidation,
    loginValidation,
  }