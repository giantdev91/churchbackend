import db from '~/db';

async function rejectVerification ({ userId }) {
    return db.query({
      text: `update app_user set
        pending_verification = false
        where id = $1;
  `,
      values: [userId],
    });
}

export default rejectVerification;