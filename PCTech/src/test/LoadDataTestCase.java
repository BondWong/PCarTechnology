package test;

import model.ParkingLot;
import junit.framework.TestCase;

public class LoadDataTestCase extends TestCase{
	public void testLoadData(){
		ParkingLot xpl = new ParkingLot();
		xpl.setName("xxxparkinglot");
		
		ParkingLot ypl = new ParkingLot();
		ypl.setName("yyyparkinglot");
		
		xpl.load();
		ypl.load();
	}
}
