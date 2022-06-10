package com.oracle.Vos;

import java.io.Serializable;
import java.util.List;

import com.oracle.model.Return;
import com.oracle.model.ReturnItems;
import com.oracle.model.Returns;

import lombok.Data;

@Data
public class ReturnUiVo implements Serializable{

	private List<Return> returns;
	private List<ReturnItems> items;
}
