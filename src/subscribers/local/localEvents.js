const EventEmitter = require('events');

const isUserInTarget = (user, target) => {

  // No target = accept all
  if (!target)
    return true;
  // Has target but no user found = refuse all
  else if (!user.id)
    return false;
  // Target is integer = target is a specific user_id
  else if (Number.isInteger(target))
    return user.id === target;
  // Target is array = target is a group of user_id
  else if (Array.isArray(target))
    return target.includes(user.id);
  // Target is a dictionary with definition
  else if (target.constructor === Object && target.type && target.data)
    if (target.type === 'users' && Array.isArray(target.data))
      return target.data.includes(user.id);
  // if (target.type == 'roles' && Array.isArray(target.data))
  //   return user.roles.includesOneOf(target.data);
  // Could not understand the target properly, refuse for security purpose
  return false;
};

module.exports = {
  localEvents: new EventEmitter(),
  isTarget: (user, data) => {
    // If there is a target
    if (user.id && data.target)
      return isUserInTarget(user, data.target);

    // Refuse if target but user not found
    else if (!user.id && data.target)
      return false;

    // No target so just accept all events
    return true;
  }
};
