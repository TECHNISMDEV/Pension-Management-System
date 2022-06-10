package com.oracle.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.google.common.base.Predicate;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;
import static springfox.documentation.builders.PathSelectors.regex;
import static com.google.common.base.Predicates.or;

@Configuration
@EnableSwagger2
public class SwaggerConfiguration {



	@Bean
	public Docket postsApi() {
		return new Docket(DocumentationType.SWAGGER_2).groupName("public-api")
				.apiInfo(apiInfo()).select().paths(postPaths()).build();
	}

	private Predicate<String> postPaths() {
		return or(regex("/app.*"), regex("/app.*"));
	}

	private ApiInfo apiInfo() {
		return new ApiInfoBuilder().title("Technism Application")
				.description("Technism Application")
				.termsOfServiceUrl("situparna.sedge@gmail.com")
				.contact("situparna.sedge@gmail.com").license("Technism License")
				.licenseUrl("situparna.sedge@gmail.com").version("1.0").build();
	}


}
