package controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.StringReader;
import java.util.Map;

import org.apache.struts2.interceptor.SessionAware;

import com.opensymphony.xwork2.ActionSupport;

public class GetSpotsInfoFileController extends ActionSupport implements SessionAware{

	/**
	 * 
	 */
	private static final long serialVersionUID = -3297685359486344132L;
	
	private String parkingLotID;
	
	private File selectedFile;
	private String errorMessage;
	
	private Map<String,Object> httpSession;
	
	public String execute() throws Exception{
		selectedFile = new File(parkingLotID);
		if(!selectedFile.exists()){
			errorMessage = "no file founded";
			return "error";
		}
		return "success";
	}
	
	public void setParkingLotID(String parkingLotID){
		this.parkingLotID = parkingLotID;
	}
	
	@Override
	public void setSession(Map<String, Object> session) {
		// TODO Auto-generated method stub
		httpSession = session;
	}
	
	public String getErrorMessage(){
		return errorMessage;
	}
	
	public File getSelectedFile(){
		return selectedFile;
	}
}