import Admin from '../../models/admin.js';

const loginAdmin = async (req, res, next) => {

  const {
    adminID
  } = req.body;
  
  let existingAdmin;

  try {

    existingAdmin = adminID == "Admin" ? adminID : null

    if(!existingAdmin) {
      return res.status(401).json({
        message: 'No account found'
      })
    }

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