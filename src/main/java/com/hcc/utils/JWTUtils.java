package com.hcc.utils;

import com.hcc.entities.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Date;
import java.util.function.Function;

@Component
public class JWTUtils {

    //how long is the token valid? a whole day
    public static final long JWT_TOKEN_VALIDITY = 6000 * 60000L * 24;

    // get the jwt secret from the properties file
    @Value("${jwt.secret}")
    private String secret;

    /**
     * Gets a username from a token
     * @param token
     * @return the subject value
     */
    public String getUsernameFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    /**
     * Get the claims (not sure which datatype- make generic to pass the claim) from token-objects inside jwt
     * @param token
     * @param claimsResolver
     * @return token claim
     * @param <T> Unknown Data type
     */
    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver ) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    /**
     * gets all the claims from a token
     * @param token
     * @return all claims from a token
     */
    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody();
    }

    /**
     * Checks the expiration date of a token.
     * @param token
     * @return expiration date of a token
     */
    public Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }

    /**
     * Verifies if the token is expired based on the results from getExpirationDateFromToken()
     * @param token
     * @return Boolean value if the token is expired or not.
     */
    public boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }

    /**
     * Generates a token
     * @param user
     * @return a JWTs generated version of a token
     */
    public String generateToken(User user) {
        return doGenerateToken(user.getUsername());
    }

    private String doGenerateToken(String subject) {
        Claims claims = Jwts.claims().setSubject(subject);
        claims.put("scopes",
                Arrays.asList(new SimpleGrantedAuthority("LEARNER_ROLE"),
                        new SimpleGrantedAuthority("CODE_REVIEWER_ROLE")));
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY))
                .signWith(SignatureAlgorithm.HS256, secret)
                .compact();
    }

    /**
     * Validates a token
     * @param token
     * @param userDetails a user's details
     * @return a boolean value of if the token is expired for a user
     */
    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = getUsernameFromToken(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
}
