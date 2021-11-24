package com.codegym.security;

import io.jsonwebtoken.lang.Assert;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.util.StringUtils;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

public class CookieClearingLogoutHandler implements LogoutSuccessHandler {

    private final List<String> cookiesToClear;

    public CookieClearingLogoutHandler(String... cookiesToClear) {
        Assert.notNull(cookiesToClear, "List of cookies cannot be null");
        this.cookiesToClear = Arrays.asList(cookiesToClear);
    }
    @Override
    public void onLogoutSuccess(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Authentication authentication) throws IOException, ServletException {
        for(String cookieName : cookiesToClear){
            Cookie  cookie = new Cookie(cookieName,null);
            String cookiePath = httpServletRequest.getContextPath();
            if( !StringUtils.hasLength(cookiePath)){
                cookiePath= "/";
            }
            cookie.setPath(cookiePath);
            cookie.setMaxAge(0);
            httpServletResponse.addCookie(cookie);
        }

        httpServletResponse.sendRedirect(httpServletRequest.getContextPath());
    }
}
