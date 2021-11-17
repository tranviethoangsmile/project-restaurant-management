package com.codegym.security;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private String getBearerTokenRequest(HttpServletRequest request){
        String authHeadere = request.getHeader("Authorization");

        if(authHeadere != null && authHeadere.startsWith("Bearer")){
            return authHeadere.replace("Bearer","");
        }
        return null;
    }

    private String getCookieValue(HttpServletRequest req){
        return Arrays.stream(req.getCookies())
                .filter(c -> c.getName().equals("JWT"))
                .findFirst()
                .map(Cookie::getValue)
                .orElse(null);
    }

    @Override
    protected  void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)throws ServletException, IOException {
        try {
            String bearerToken = getBearerTokenRequest(request);

            String authorizationCookie = getCookieValue(request);

            setAuthentication(request,bearerToken);

            setAuthentication(request, authorizationCookie);

        }catch (Exception e){
            logger.error("Can NOT set user authentication -> Message: {0}", e);
        }

        filterChain.doFilter(request, response);
    }

    private void setAuthentication(HttpServletRequest request, String authorizationValue) {
//        if (authorizationValue != null && jwtService.validateJwtToken(authorizationValue)) {
//
//            String username = jwtService.getUserNameFromJwtToken(authorizationValue);
//
//            UserDetails userDetails = userService.loadUserByUsername(username);
//
//            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
//                    userDetails, null, userDetails.getAuthorities());
//
//            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//
//            SecurityContextHolder.getContext().setAuthentication(authentication);
//        }
    }
}
