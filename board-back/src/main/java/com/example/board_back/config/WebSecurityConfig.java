package com.example.board_back.config;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.example.board_back.filter.JwtAuthenticationFilter;

import io.micrometer.observation.annotation.Observed;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Configurable
@EnableWebSecurity
@Configuration
@RequiredArgsConstructor
public class WebSecurityConfig {
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.disable()) // CORS 설정 (필요시 추가)
            .csrf(csrf -> csrf.disable()) // CSRF 비활성화
            .httpBasic(httpBasic -> httpBasic.disable()) // HTTP Basic 비활성화
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // 상태 없는 세션 관리
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/", "/api/v1/auth/**", "/api/v1/search/**", "/file/**").permitAll() // 특정 경로에 대해 접근 허용
                .requestMatchers(HttpMethod.GET, "/api/v1/board/**", "/api/v1/user/*").permitAll() // 특정 경로에 대해 접근 허용
                .anyRequest().authenticated() // 나머지 요청은 인증 필요
            )
            .exceptionHandling(exception -> 
                exception.authenticationEntryPoint(new FailedAuthenticationEntryPoint()) // 인증 실패 처리
            );

        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class); // JWT 필터 추가

        return http.build();
    }
}

class FailedAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException authException) throws IOException, ServletException {
        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        response.getWriter().write("{ \"code\": \"NP\", \"message\": \"Do not have permission.\" }");
    }
}
