const AppleStrategy = require('passport-apple').Strategy;
const { webAPI, socialAccount } = require('config');
const { ROLE_USER } = require('app/utils/constant');
const { generateRefreshToken } = require('app/utils/roles');

function extendAppleStrategy({ userRepo, opts }) {
  const callback = async function (accessToken, refreshToken, profile, done) {
    const match = { socialId: profile.id, provider: profile.provider };
    const user = await userRepo.findOne(match);
    if (user) {
      return done(null, user);
    }

    const { id, last_name: ln, first_name: fn, email } = profile._json;
    const data = {
      socialId: id,
      email,
      ln,
      fn,
      roles: ROLE_USER,
      provider: profile.provider,
    };
    const newUser = await userRepo.create(data);
    const rt = generateRefreshToken(newUser._id);
    const socialUser = await userRepo.updateRefreshToken(newUser._id, rt);

    return done(null, socialUser);
  };

  return new AppleStrategy(
    {
      clientID: socialAccount.facebookClientId,
      clientSecret: socialAccount.facebookSecret,
      callbackURL: `${webAPI}/v1/social/facebook/vfy`,
      profileFields: [
        'id',
        'displayName',
        'name',
        'photos',
        'email',
        'location',
      ],
    },
    callback
  );
}

module.exports = extendAppleStrategy;
