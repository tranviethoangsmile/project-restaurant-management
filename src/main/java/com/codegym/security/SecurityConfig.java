package com.codegym.security;


import com.codegym.service.user.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    IUserService userService;

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter();
    }

    @Bean
    public RestAuthenticationEntryPoint restServicesEntryPoint() {
        return new RestAuthenticationEntryPoint();
    }

    @Bean(  BeanIds.AUTHENTICATION_MANAGER)
    @Override
    public AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(10);
    }

    @Bean
    public CustomAccessDeniedHandler customAccessDeniedHandler() {
        return new CustomAccessDeniedHandler();
    }

    @Autowired
    public void configureGlobalSecurity(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userService).passwordEncoder(passwordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().ignoringAntMatchers("/**");
        http.httpBasic().authenticationEntryPoint(restServicesEntryPoint());

        http.authorizeRequests()
                .antMatchers("/", "/api/auth/login", "/api/auth/register", "/login").permitAll()
                .antMatchers("/desk", "/admin", "/category", "/product", "/staff").hasAnyAuthority("ADMIN")
                .antMatchers("/home").hasAnyAuthority("ADMIN", "USER")
                .antMatchers("/resource/**").permitAll()

                .anyRequest().authenticated()
                .and()
                .formLogin()
                .loginProcessingUrl("/login")
                .loginPage("/login")
                .usernameParameter("username")
                .passwordParameter("password")
                .defaultSuccessUrl("/home")
                .and()
                .logout()
                .logoutUrl("/logout")
                .logoutSuccessUrl("/")
                .deleteCookies("JWT")
                .invalidateHttpSession(true)
                .and()
                .csrf().disable();

        http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling().accessDeniedHandler(customAccessDeniedHandler());

        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.cors();
    }

//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//
//        http.csrf().disable()
//                .exceptionHandling().authenticationEntryPoint(restAuthenticationEntryPoint).and()
//                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
//        //CSRF ( Cross Site Request Forgery) l?? k?? thu???t t???n c??ng b???ng c??ch s??? d???ng quy???n ch???ng th???c c???a ng?????i s??? d???ng ?????i v???i 1 website kh??c
//
//        // C??c trang kh??ng y??u c???u login
//        http.authorizeRequests().antMatchers("/api/admin/**", "/", "/login", "/logout").permitAll();
//
//        // Khi ng?????i d??ng ???? login, v???i vai tr?? XX.
//        // Nh??ng truy c???p v??o trang y??u c???u vai tr?? YY,
//        // Ngo???i l??? AccessDeniedException s??? n??m ra.
//        http.authorizeRequests().and().exceptionHandling().accessDeniedPage("/403");
//
//        // C???u h??nh cho Login Form.
//        http.authorizeRequests().and().formLogin()//
//                // Submit URL c???a trang login
//                .loginProcessingUrl("/login") // Submit URL
//                .loginPage("/")//
//                .defaultSuccessUrl("/home")	//????y Khi ????ng nh???p th??nh c??ng th?? v??o trang n??y. userAccountInfo s??? ???????c khai b??o trong controller ????? hi???n th??? trang view t????ng ???ng
//                .failureUrl("/login?error=true")		// Khi ????ng nh???p sai username v?? password th?? nh???p l???i
//                .usernameParameter("username")			// tham s??? n??y nh???n t??? form login ??? b?????c 3 c?? input  name='username'
//                .passwordParameter("password")			// tham s??? n??y nh???n t??? form login ??? b?????c 3 c?? input  name='password'
//                // C???u h??nh cho Logout Page.
//                .and().logout().logoutUrl("/logout").logoutSuccessUrl("/login");
//
//        http.addFilterBefore(authTokenFilter(), UsernamePasswordAuthenticationFilter.class);
//    }
}
