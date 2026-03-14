import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';


passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
        
        const user = {
            id: profile.id,
            displayName: profile.displayName,
            email: profile.emails?.[0]?.value,
            avatar: profile.photos?.[0]?.value
        };

        return done(null, user);
    }
));

// Serialize user instances to the session.
passport.serializeUser((user, done) => {
    done(null, user);
});

// Deserialize user instances from the session.
passport.deserializeUser((user, done) => {
    done(null, user);
});

export default passport;
