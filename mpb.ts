declare lower;

def xxs_mpb_value=1;
def xs_mpb_value=3;
def s_mpb_value=5;
def m_mpb_value=8;
def l_mpb_value=12;
def xl_mpb_value=15;
def xxl_mpb_value=20;

# ok so first we define sma for mpb
def fast_sma = Average(close, 9);
def slow_sma = Average(close, 20);
## ok so the idea here is check if we have a positive or negative swing over sma
def sma_value;# = 0.0;
#what the literal fuck
#bruh this shouldn't be this hard (that's what she said)
#if { # red candle
#for the sake of dumbassery we're going to ignore open price
#indicates downtrend

#plot sma_value
def sma_open_gt_close = close < open;

if sma_open_gt_close and  close < slow_sma{
    sma_value = (-1*l_mpb_value);
} else if sma_open_gt_close and close < fast_sma {
    sma_value = (-1*m_mpb_value);
}else if sma_open_gt_close and close > slow_sma {
    sma_value = s_mpb_value;
}else if sma_open_gt_close and close > fast_sma {
    sma_value= xs_mpb_value;
}else if !sma_open_gt_close and close < slow_sma  {
    sma_value = (-1*m_mpb_value);
}else if !sma_open_gt_close and close < fast_sma {
    sma_value = (-1*s_mpb_value);
}else if !sma_open_gt_close and close > slow_sma {
    sma_value = l_mpb_value;
}else if !sma_open_gt_close and close > fast_sma {
    sma_value = m_mpb_value;
}
else{
    sma_value = 0.0;
}



input ADXCutoff = 25;
input DMILength = 6;
input MaFastLength=9;
input DIRangeFilter=10;


#DMI, ADX plots
def averageType = AverageType.SIMPLE;
def hiDiff = high - high[1];
def loDiff = low[1] - low;

def plusDM = if hiDiff > loDiff and hiDiff > 0 then hiDiff else 0;
def minusDM = if loDiff > hiDiff and loDiff > 0 then loDiff else 0;

def ATR = MovingAverage(averageType, TrueRange(high, close, low), DMILength);
def dmiplus = 100 * MovingAverage(averageType, plusDM, DMILength) / ATR;
def dmineg = 100 * MovingAverage(averageType, minusDM, DMILength) / ATR;
def DX = if (dmiplus + dmineg > 0) then 100 * AbsValue(dmiplus - dmineg) / (dmiplus+ dmineg) else 0;
def adx= MovingAverage(averageType, DX, DMILength);

#ok so now that we've got an adx as well as dmis we can start calculating the mpb for adx and dmi

#do adx first
def adx_value;
def strong_trend = adx > adx[2];
  if strong_trend and adx > 20{
    adx_value = xxl_mpb_value;
  }else if strong_trend and adx < 20{
    adx_value = xl_mpb_value;
   }else if !strong_trend and ((dmiplus > dmiplus[2] and dmineg < dmineg[2]) or (dmineg > dmineg[2] and dmiplus[2] >dmiplus))
   {
       adx_value = xl_mpb_value;
   }else{
       adx_value = m_mpb_value;
    }

plot mpb_sma = sma_value;
mpb_sma.AssignValueColor(Color.BLUE);
plot mpb_adx = adx_value;
mpb_adx.AssignValueColor(Color.RED);
