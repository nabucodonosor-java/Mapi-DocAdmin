package com.mapi.docadm.dto;

import java.io.Serializable;

import org.springframework.web.multipart.MultipartFile;

public class FileDto implements Serializable {
	private static final long serialVersionUID = 1L;

	private MultipartFile file;

	public FileDto() {
	}

	public MultipartFile getFile() {
		return file;
	}

	public void setFile(MultipartFile file) {
		this.file = file;
	}

}
