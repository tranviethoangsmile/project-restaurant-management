package com.codegym.controller.api;

import com.codegym.entity.Role;
import com.codegym.entity.User;
import com.codegym.entity.dto.UserDTO;
import com.codegym.security.request.LoginRequest;
import com.codegym.entity.JwtResponse;
import com.codegym.service.jwt.JwtService;
import com.codegym.service.role.IRoleService;
import com.codegym.service.user.IUserService;
import com.codegym.ultil.AppUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;


import javax.validation.Valid;
import java.util.Optional;


@RestController
@RequestMapping("/api/auth")
public class AuthAPI {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
	JwtService jwtService;

	@Autowired
	private IUserService userService;

	@Autowired
	private IRoleService roleService;

	@Autowired
	private AppUtils appUtils;

	@PostMapping("/register")
	public ResponseEntity<?> register(@Valid @RequestBody UserDTO userDTO, BindingResult bindingResult) {

		if (bindingResult.hasErrors())
			return appUtils.mapErrorToResponse(bindingResult);

		userService.save(userDTO.toUser());

		return new ResponseEntity<>(HttpStatus.CREATED);

//		Optional<UserDTO> optUser = Optional.ofNullable(userService.findUserDTOByUsername(userDTO.getUsername()));
//
//		if (optUser.isPresent()) {
//			throw new EmailExistsException("Email already exists");
//		}
//
//		Optional<Role> optRole = roleService.findById(userDTO.getRole().getId());
//
//		if (!optRole.isPresent()) {
//			throw new DataInputException("Invalid account role");
//		}

//		try {
//			userService.save(userDTO.toUser());
//
//			return new ResponseEntity<>(HttpStatus.CREATED);
//
//		} catch (DataIntegrityViolationException e) {
//			throw new DataInputException("Account information is not valid, please check the information again");
//		}
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody User user) {
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);

		String jwt = jwtService.generateTokenLogin(authentication);
		UserDetails userDetails = (UserDetails) authentication.getPrincipal();
		User currentUser = userService.findByUsername(user.getUsername()).get();

		JwtResponse jwtResponse = new JwtResponse(
				jwt,
				currentUser.getId(),
				userDetails.getUsername(),
				currentUser.getUsername(),
				userDetails.getAuthorities()
		);

		ResponseCookie springCookie = ResponseCookie.from("JWT", jwt)
				.httpOnly(false)
				.secure(false)
				.path("/")
				.maxAge(60 * 1000)
				.domain("localhost")
				.build();

		System.out.println(jwtResponse);

		return ResponseEntity
				.ok()
				.header(HttpHeaders.SET_COOKIE, springCookie.toString())
				.body(jwtResponse);

	}

	@GetMapping("/home")
	@ResponseBody
	@PreAuthorize("hasAnyAuthority('ADMIN')")
	public String getHome() {
		return "Home";
	}
}
