package controller;

import java.util.Map;
import java.util.Set;

import model.ParkingLots;

import org.apache.struts2.interceptor.SessionAware;

import com.opensymphony.xwork2.ActionSupport;

public class GetParkingLotsController extends ActionSupport implements SessionAware{

	/**
	 * 
	 */
	private static final long serialVersionUID = -8309384711637576320L;
	
	private ParkingLots parkingLots;
	private Set<String> necessaryData;
	
	private Map<String,Object> httpSession;
	
	@Override
	public void setSession(Map<String, Object> session) {
		// TODO Auto-generated method stub
		httpSession = session;
	}
	
	public String execute() throws Exception{
		parkingLots = (ParkingLots)httpSession.get("parkingLots");
		boolean isParkingLotsExisted = false;
		isParkingLotsExisted = (parkingLots==null?false:true);
		
		if(!isParkingLotsExisted){
			parkingLots = new ParkingLots();
			parkingLots.load();
			httpSession.put("parkingLots",parkingLots);
		}
		
		necessaryData = parkingLots.getParkingLots().keySet();
		
		return "success";
	}

	public Set<String> getNecessaryData() {
		return necessaryData;
	}
	
}
