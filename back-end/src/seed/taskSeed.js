const Task = require('../models/Task');
const User = require('../models/User');

const seedTasks = async () => {
  try {
    const existingTasks = await Task.countDocuments();
    
    if (existingTasks > 0) {
      console.log('Tasks already exist in database');
      return;
    }

    const user1 = await User.findOne({ email: 'user1@example.com' });
    const user2 = await User.findOne({ email: 'user2@example.com' });
    const admin = await User.findOne({ email: 'admin@hyperverge.co' });

    const allUsers = await User.find({ role: 'user' });
    
    if (allUsers.length === 0) {
      console.log('No users found to assign tasks. Please create users first.');
      return;
    }

    const assignee1 = user1 || allUsers[0];
    const assignee2 = user2 || (allUsers.length > 1 ? allUsers[1] : allUsers[0]);

    const sampleTasks = [
      {
        title: 'Complete project documentation',
        description: 'Write comprehensive documentation for the API endpoints',
        status: 'pending',
        userId: assignee1._id
      },
      {
        title: 'Fix authentication bug',
        description: 'Resolve the JWT token expiration issue',
        status: 'in-progress',
        userId: assignee1._id
      },
      {
        title: 'Database optimization',
        description: 'Add indexes to improve query performance',
        status: 'completed',
        userId: assignee1._id
      },
      
      {
        title: 'Code review',
        description: 'Review pull requests from team members',
        status: 'pending',
        userId: assignee2._id
      },
      {
        title: 'Update dependencies',
        description: 'Update npm packages to latest versions',
        status: 'in-progress',
        userId: assignee2._id
      },
      {
        title: 'Write unit tests',
        description: 'Add test coverage for authentication module',
        status: 'pending',
        userId: assignee2._id
      },
      
      {
        title: 'UI improvements',
        description: 'Enhance the dashboard user interface',
        status: 'pending',
        userId: allUsers[0]._id
      },
      {
        title: 'API endpoint testing',
        description: 'Test all REST API endpoints',
        status: 'in-progress',
        userId: allUsers.length > 1 ? allUsers[1]._id : allUsers[0]._id
      }
    ];

    await Task.insertMany(sampleTasks);
    console.log(`${sampleTasks.length} tasks seeded successfully`);
    console.log(`Tasks assigned to:`);
    console.log(`- ${assignee1.name} (${assignee1.email}): 3 tasks`);
    if (assignee2._id.toString() !== assignee1._id.toString()) {
      console.log(`- ${assignee2.name} (${assignee2.email}): 3 tasks`);
    }
  } catch (error) {
    console.error('Error seeding tasks:', error.message);
  }
};

module.exports = seedTasks;