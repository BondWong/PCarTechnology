package test;

import model.ParkingLots;
import junit.framework.TestCase;

public class ParkingLotsLoadDataTestCase extends TestCase{
	public void testParkingLotsLoadData(){
		ParkingLots pls = new ParkingLots();
		pls.load();
		
		System.out.println("parkingLots: "+pls.getParkingLots());
	}
}
