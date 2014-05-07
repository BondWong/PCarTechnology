package controller;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import model.ParkingLot;
import model.ParkingLots;

import org.apache.struts2.interceptor.SessionAware;

import com.opensymphony.xwork2.ActionSupport;

public class GetParkingLotsController extends ActionSupport implements SessionAware{

	/**
	 * 
	 */
	private static final long serialVersionUID = -8309384711637576320L;
	
	private ParkingLots parkingLots;
	private Set<List<String>> necessaryData;
	
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
		
		Map<String, ParkingLot> temp = parkingLots.getParkingLots();
		necessaryData = new LinkedHashSet<List<String>>();
		for(Entry<String, ParkingLot> entry : temp.entrySet()){
			List<String> t = new ArrayList<String>();
			t.add(entry.getKey());
			t.add(entry.getValue().getName());
			necessaryData.add(t);
		}
		
		return "success";
	}

	public Set<List<String>> getNecessaryData() {
		return necessaryData;
	}
	
}
