package com.codegym.controller.api;

import com.codegym.entity.User;
import com.codegym.security.JwtUtils;
import com.codegym.security.request.LoginRequest;
import com.codegym.security.response.JwtResponse;
import com.codegym.security.service.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.codegym.service.role.IRoleService;
import com.codegym.service.user.IUserService;

import javax.validation.Valid;


@RestController
@RequestMapping("/api/admin")
public class AdminAPI {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    IUserService userService;

    @Autowired
    IRoleService roleService;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    private JwtUtils jwtUtils;


//    	@PostMapping("/login")
//	    public ResponseEntity<?> login(@RequestBody UserDTO userDTO) {
//            Authentication authentication = authenticationManager.authenticate(
//                    new UsernamePasswordAuthenticationToken(userDTO.getUsername(), userDTO.getPassword()));
//
//            SecurityContextHolder.getContext().setAuthentication(authentication);
//
//            String jwt = jwtService.generateTokenLogin(authentication);
//            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
//            User currentUser = userService.findByUsername(userDTO.getUsername()).get();
//
//            JwtResponse jwtResponse = new JwtResponse(
//                    jwt,
//                    currentUser.getId(),
//                    userDetails.getUsername(),
//                    currentUser.getUsername(),
//                    userDetails.getAuthorities()
//            );
//
//            ResponseCookie springCookie = ResponseCookie.from("JWT", jwt)
//                    .httpOnly(false)
//                    .secure(false)
//                    .path("/")
//                    .maxAge(60 * 1000)
//                    .domain("localhost")
//                    .build();
//            return ResponseEntity
//                    .ok()
//                    .header(HttpHeaders.SET_COOKIE, springCookie.toString())
//                    .body(jwtResponse);
//
//        }

    @PostMapping("/login")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);

		String jwt = jwtUtils.generateJwtToken(authentication);
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		User currentUser = userService.findByUsername(loginRequest.getUsername()).get();
//		System.out.println(currentUser.getUsername());

		JwtResponse jwtResponse =new JwtResponse(
				jwt,
				currentUser.getId(),
				userDetails.getUsername(),
				userDetails.getAuthorities()

		);
		ResponseCookie springCookie = ResponseCookie.from("JWT", jwt)
				.httpOnly(false)
				.secure(false)
				.path("/")
				.maxAge(60 * 1000)

				.domain("localhost")
				.build();
		return ResponseEntity
				.ok()
				.header(HttpHeaders.SET_COOKIE, springCookie.toString())
				.body(jwtResponse);

	}
}
