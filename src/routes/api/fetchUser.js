import axios from 'axios';

async function fetchUser() {
  try {
    const userResponse = await axios.get('https://randomuser.me/api/?seed=foobar')

    return userResponse;

  } catch (error) {

    return { message: error.message }
  }
};

export default fetchUser;