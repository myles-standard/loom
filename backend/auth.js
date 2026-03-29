import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import 'dotenv/config';
import prisma from './components/Prisma.js';

const callbackUrl = process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3000/auth/google/callback';

passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: callbackUrl,
        passReqToCallback: false
    },
    async (accessToken, refreshToken, profile, done) => {
        
        try {

            const user = await prisma.user.upsert({
                where: { googleId: profile.id },
                update: { displayName: profile.displayName },
                create: {
                    googleId: profile.id,
                    displayName: profile.displayName,
                    email: profile.emails?.[0]?.value || '',
                    avatar: profile.photos?.[0]?.value.replace('s96-c', 's300-c')
                }
            });

            return done(null, user);

        } catch (error) {
            return done(error, null);
        }
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
