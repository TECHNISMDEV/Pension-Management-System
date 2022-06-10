package com.oracle.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class DateUtil {

	public static Date getCurrentDate()
	{
		Date newFormatedDate=null;
		Date d=new Date();
		SimpleDateFormat format=new SimpleDateFormat("dd-MM-yyyy hh:mm:ss");
		try {
			newFormatedDate=format.parse(format.format(d));
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return newFormatedDate;
	}
	
	public static Date convertStringToDate(String dateInString)
	{
		SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy", Locale.ENGLISH);
		Date date=null;
		try {
			 date = formatter.parse(dateInString);
			//Date d=formatter.
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return date;
	}
	
	public static String convertDateToString(Date d)
	{
		SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy", Locale.ENGLISH);
		return formatter.format(d);
	}
}
