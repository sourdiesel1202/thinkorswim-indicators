def xxs_mpb_value=1;
def xs_mpb_value=3;
def s_mpb_value=5;
def m_mpb_value=8;
def l_mpb_value=12;
def xl_mpb_value=15;
def xxl_mpb_value=20;


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


plot mpb_sma = sma_value;
