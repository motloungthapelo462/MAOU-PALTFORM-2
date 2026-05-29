export const MAOU_PINE_SCRIPT_TEMPLATE = `//@version=5
indicator("MAOU Structure Engine", overlay=true, max_lines_count=200, max_labels_count=200)

// --- Inputs ---
showSignals = input.bool(true, "Show Structure Signals")
showTP = input.bool(true, "Show TP/SL Zones")
atrLength = input.int(14, "ATR Length")
atrMultiplier = input.float(1.5, "ATR Multiplier")

// --- Structure Detection ---
series_high = ta.highest(high, 3)
series_low = ta.lowest(low, 3)

hh = high > high[1] and low > low[1]
hl = low > low[1] and high > high[1]
lh = high < high[1] and low < low[1]
ll = low < low[1] and high < high[1]

bullishStructure = hh and hl
bearishStructure = lh and ll

// --- Risk and Targets ---
atrValue = ta.atr(atrLength)
entryPrice = close
stopLoss = bullishStructure ? low - atrValue * atrMultiplier : bearishStructure ? high + atrValue * atrMultiplier : na

tp1 = bullishStructure ? entryPrice + atrValue * 1.5 : bearishStructure ? entryPrice - atrValue * 1.5 : na
tp2 = bullishStructure ? entryPrice + atrValue * 2.5 : bearishStructure ? entryPrice - atrValue * 2.5 : na
tp3 = bullishStructure ? entryPrice + atrValue * 3.5 : bearishStructure ? entryPrice - atrValue * 3.5 : na

// --- Plot Labels ---
plotshape(showSignals and bullishStructure, title="MAOU Buy", location=location.belowbar, style=shape.labelup, color=color.new(color.green, 0), text="BUY")
plotshape(showSignals and bearishStructure, title="MAOU Sell", location=location.abovebar, style=shape.labeldown, color=color.new(color.red, 0), text="SELL")

plot(showTP and bullishStructure ? tp1 : na, title="TP1", style=plot.style_linebr, color=color.lime, linewidth=2)
plot(showTP and bullishStructure ? tp2 : na, title="TP2", style=plot.style_linebr, color=color.green, linewidth=2)
plot(showTP and bullishStructure ? tp3 : na, title="TP3", style=plot.style_linebr, color=color.teal, linewidth=2)
plot(showTP and bullishStructure ? stopLoss : na, title="SL", style=plot.style_linebr, color=color.red, linewidth=2)

plot(showTP and bearishStructure ? tp1 : na, title="TP1 Bear", style=plot.style_linebr, color=color.lime, linewidth=2)
plot(showTP and bearishStructure ? tp2 : na, title="TP2 Bear", style=plot.style_linebr, color=color.green, linewidth=2)
plot(showTP and bearishStructure ? tp3 : na, title="TP3 Bear", style=plot.style_linebr, color=color.teal, linewidth=2)
plot(showTP and bearishStructure ? stopLoss : na, title="SL Bear", style=plot.style_linebr, color=color.red, linewidth=2)

// --- Notes ---
var label info = na
if barstate.islast and showSignals
    label.delete(info)
    infoText = bullishStructure ? "HH + HL Bullish Structure" : bearishStructure ? "LH + LL Bearish Structure" : "No high-probability setup"
    info := label.new(bar_index, high, infoText, xloc=xloc.bar_index, yloc=yloc.abovebar, color=color.new(color.blue, 80), textcolor=color.white, style=label.style_label_center)

// --- Disclaimer ---
label.new(bar_index, low, "MAOU Structure Engine — probability-based trading signals. Not financial advice.", xloc=xloc.bar_index, yloc=yloc.belowbar, color=color.new(color.black, 80), textcolor=color.yellow, style=label.style_label_left, size=size.small)
`;
