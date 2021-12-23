import Admin from '../../models/admin.js';

const loginAdmin = async (req, res, next) => {

  const {
    adminID
  } = req.body;
  
  let existingAdmin;

  try {

    existingAdmin = await Admin.findOne({
        adminID: adminID
    });

  } catch (error) {
      return res.json({
        error
      });
  };

  res.json({
    message: 'Welcome back ADMIN!',
    admin: existingAdmin,
  });
};

export default loginAdmin;