const roles = {
    customer: ['customer'],
    admin: ['readPlans', 'createEnquiry', 'managePlans', 'manageUsers'],
    employee: {
      level1: ['readPlans', 'createEnquiry'],
      level2: ['readPlans', 'createEnquiry', 'manageEnquiries'],
      level3: ['readPlans', 'createEnquiry', 'manageEnquiries', 'managePlans']
    }
  };