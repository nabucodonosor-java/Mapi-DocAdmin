package com.mapi.docadm.dto;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import org.springframework.data.domain.Page;

import com.mapi.docadm.entities.User;

public class UserDto implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	@NotBlank(message = "Campo obrigatório")
	private String firstName;
	@NotBlank(message = "Campo obrigatório")
	private String lastName;
	@Email(message = "Digitar email válido!")
	private String email;

	private Set<RoleDto> roles = new HashSet<>();

	public UserDto() {
		super();
	}

	public UserDto(User user) {
		id = user.getId();
		firstName = user.getFirstName();
		lastName = user.getLastName();
		email = user.getEmail();
		user.getRoles().forEach(r -> this.roles.add(new RoleDto(r)));
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Set<RoleDto> getRoles() {
		return roles;
	}

	public static Page<UserDto> converter(Page<User> list) {
		return list.map(UserDto::new);
	}

}
