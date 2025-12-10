const User = require('../models/User');

const seedAdmin = async () => {
  try {
    const adminEmail = 'admin@hyperverge.co';
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    
    if (existingAdmin) {
      console.log('Admin already exists');
      return;
    }

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: adminEmail,
      password: 'admin123',
      role: 'admin'
    });

    console.log('Admin user created successfully:', admin.email);
  } catch (error) {
    console.error('Error seeding admin:', error.message);
  }
};

module.exports = seedAdmin;