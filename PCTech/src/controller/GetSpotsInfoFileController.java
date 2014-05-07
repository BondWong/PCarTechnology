package controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.util.Map;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.interceptor.SessionAware;

import com.opensymphony.xwork2.ActionSupport;

public class GetSpotsInfoFileController extends ActionSupport implements SessionAware{

	/**
	 * 
	 */
	private static final long serialVersionUID = -3297685359486344132L;
	
	private String parkingLotID;
	
	private String selectedFileData;
	private String errorMessage;
	
	private Map<String,Object> httpSession;
	
	public String execute() throws Exception{
		String path = getRoot()+"WEB-INF\\" + parkingLotID + "InfoFile.txt";
		
		selectedFileData = (String) httpSession.get(path);
		
		if(selectedFileData == null){
			File selectedFile = new File(path);
			if(!selectedFile.exists()){
				errorMessage = "no file founded";
				return "error";
			}
			
			@SuppressWarnings("resource")
			BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(selectedFile)));
			StringBuffer sb = new StringBuffer();
			String line="";
			while((line = br.readLine())!=null){
				sb.append(line);
			}
			
			selectedFileData = sb.toString();
			
			httpSession.put(path, selectedFileData);
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
	
	public String getSelectedFileData(){
		return selectedFileData;
	}
	
	@SuppressWarnings("deprecation")
	public String getRoot(){
		String temp = ServletActionContext.getRequest().getRealPath("/");
		return temp;
	}
}