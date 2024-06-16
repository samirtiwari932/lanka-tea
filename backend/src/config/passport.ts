import passport from 'passport';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import User from '../models/User';

console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);  // Debug log
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET);  // Debug log

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: "/auth/google/callback",
},
async (accessToken, refreshToken, profile: Profile, done) => {
  const { id, emails, name } = profile;
  const email = emails && emails[0].value || '';

  try {
    let user = await User.findOne({ googleId: id });
    if (!user) {
      user = await User.findOne({ email });
      if (!user) {
        user = new User({
          googleId: id,
          email,
          firstName: name?.givenName,
          lastName: name?.familyName,
        });
        await user.save();
      } else {
        user.googleId = id;
        await user.save();
      }
    }
    return done(null, user);
  } catch (err) {
    return done(err, false);
  }
}));

passport.serializeUser((user, done) => {
  done(null, (user as any).id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, false);
  }
});