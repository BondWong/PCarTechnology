package controller;

import java.util.Map;

import model.ParkingLots;

import org.apache.struts2.interceptor.SessionAware;

import com.opensymphony.xwork2.ActionSupport;

public class HomePageController extends ActionSupport implements SessionAware{

	/**
	 * 
	 */
	private static final long serialVersionUID = -8309384711637576320L;
	
	private ParkingLots parkingLots;
	
	private Map<String,Object> httpSession;
	
	@Override
	public void setSession(Map<String, Object> session) {
		// TODO Auto-generated method stub
		setHttpSession(session);
	}

	public void setHttpSession(Map<String,Object> httpSession) {
		this.httpSession = httpSession;
	}
	
	public String execute() throws Exception{
		parkingLots = (ParkingLots)httpSession.get("parkingLots");
		boolean isParkingLotsExisted = false;
		isParkingLotsExisted = (parkingLots==null?false:true);
		
		if(!isParkingLotsExisted){
			ParkingLots pls = new ParkingLots();
			pls.load();
			httpSession.put("parkingLots",pls);
		}
		
		return "success";
	}
	
}
