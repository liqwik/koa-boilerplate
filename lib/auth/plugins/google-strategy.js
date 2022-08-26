const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { ROLE_USER } = require('app/utils/constant');
const { generateRefreshToken } = require('app/utils/roles');

function extendGoogleStrategy({ userRepo, opts }) {
  const callback = async (accessToken, refreshToken, profile, done) => {
    const match = { socialId: profile.id, provider: profile.provider };

    const user = await userRepo.findOne(match);

    if (user) {
      return done(null, user);
    }

    const data = {
      socialId: profile.id,
      email: profile.emails[0].value,
      ln: profile.name.familyName,
      fn: profile.name.givenName,
      pPic: profile.photos[0].value,
      roles: ROLE_USER,
      provider: profile.provider,
    };

    const newUser = await userRepo.create(data);
    const rt = generateRefreshToken(newUser._id);
    const socialUser = await userRepo.updateRefreshToken(newUser._id, rt);

    return done(null, { rt, t: socialUser });
  };

  return new GoogleStrategy(
    {
      ...opts,
    },
    callback
  );
}

module.exports = extendGoogleStrategy;
