package com.mapi.docadm.dto;

import java.io.Serializable;

public class UriDto implements Serializable {
	private static final long serialVersionUID = 1L;

	private String uri;

	public UriDto() {
	}

	public UriDto(String uri) {
		this.uri = uri;
	}

	public String getUri() {
		return uri;
	}

	public void setUri(String uri) {
		this.uri = uri;
	}

}
